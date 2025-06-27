using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.UserName))
            return BadRequest("User name is taken");

        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
            UserName = registerDto.UserName.ToLower(),
            PassworHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PassworSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDto()
        {
            UserName = user.UserName,
            Token = tokenService.CreateToken(user)
        };

    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());
        if (user == null)
            return Unauthorized("User name not found");

        using var hmac = new HMACSHA512(user.PassworSalt);
        var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computeHash.Length; i++)
        {
            if (computeHash[i] != user.PassworHash[i]) return Unauthorized("Invalid password");
        }

        return new UserDto()
        {
            UserName = user.UserName,
            Token = tokenService.CreateToken(user)
        };

    }
    private async Task<bool> UserExists(string userName)
    {
        return await context.Users.AnyAsync(x => x.UserName.ToLower() == userName.ToLower());
    }
}
