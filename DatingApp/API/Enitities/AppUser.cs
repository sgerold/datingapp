namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string UserName { get; set; }

    public required byte[] PassworHash { get; set;  }
    public required byte[] PassworSalt { get; set; }
}