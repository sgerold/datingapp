namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string DisplayName { get; set; }
    public required string Email { get; set; }
    public string? ImageUrl { get; set; }
    public required byte[] PassworHash { get; set; }
    public required byte[] PassworSalt { get; set; }
}