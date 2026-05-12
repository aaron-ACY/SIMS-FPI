using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class User
    {
        [Name("id")]
        public string Id { get; set; } = string.Empty;

        [Name("email")]
        public string Email { get; set; } = string.Empty;

        [Name("password")]
        public string Password { get; set; } = string.Empty;

        [Name("role")]
        public string Role { get; set; } = string.Empty;

        [Name("full_name")]
        public string FullName { get; set; } = string.Empty;

        [Name("hash_algorithm")]
        public string HashAlgorithm { get; set; } = string.Empty;
    }
}