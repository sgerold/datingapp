using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(DataContext dataContext) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetAppUsers()
    {
        var users = await dataContext.Users.ToListAsync();
        return Ok(users);
    }
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetAppUser(int id)
    {
        var user = await dataContext.Users.FindAsync(id);
        if (user == null) return NotFound();

        return Ok(user);
    }
    

}
