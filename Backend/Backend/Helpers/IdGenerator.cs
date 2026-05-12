using Backend.Models.Entities;

namespace Backend.Helpers
{
    public static class IdGenerator
    {
        private static readonly Random _random = new Random();

        /// Format: BD00 + 3 số (001 - 999)
        public static string GenerateStudentId(IEnumerable<string> existingIds)
        {
            return GenerateRandomId("BD00", existingIds);
        }

        /// Format: FPI + 3 số (001 - 999)
        public static string GenerateTeacherId(IEnumerable<string> existingIds)
        {
            return GenerateRandomId("FPI", existingIds);
        }

        /// Format: AD + 3 số (001 - 999)
        public static string GenerateAdminId(IEnumerable<string> existingIds)
        {
            return GenerateRandomId("AD", existingIds);
        }

        private static string GenerateRandomId(string prefix, IEnumerable<string> existingIds)
        {
            string newId;
            int maxAttempts = 1000;
            int attempts = 0;

            do
            {
                int number = _random.Next(1, 1000);
                newId = $"{prefix}{number:D3}";
                attempts++;

                if (attempts >= maxAttempts)
                {
                    throw new Exception($"Hệ thống đã hết mã ID trống cho tiền tố {prefix}.");
                }

            } while (existingIds.Contains(newId));

            return newId;
        }
    }
}