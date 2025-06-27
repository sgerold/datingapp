using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class UsersController(DataContext dataContext) : BaseApiController
{

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetAppUsers()
    {
        var users = await dataContext.Users.ToListAsync();
        return Ok(users);
    }
    
    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetAppUser(int id)
    {
        var user = await dataContext.Users.FindAsync(id);
        if (user == null) return NotFound();

        return Ok(user);
    }
    

}
