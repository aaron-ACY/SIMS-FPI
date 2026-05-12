namespace Backend.Services.Interfaces
{
    public interface ICsvService
    {
        // Đọc toàn bộ danh sách từ file
        List<T> ReadAll<T>(string filePath);

        // Ghi đè toàn bộ danh sách vào file
        void WriteAll<T>(string filePath, List<T> records);

        // Thêm một bản ghi mới vào cuối file
        void AppendRecord<T>(string filePath, T record);

        // Cập nhật hoặc Xóa dựa trên một điều kiện (Predicate)
        void UpdateRecords<T>(string filePath, Func<T, bool> predicate, T updatedRecord);
        void DeleteRecords<T>(string filePath, Func<T, bool> predicate);
    }
}