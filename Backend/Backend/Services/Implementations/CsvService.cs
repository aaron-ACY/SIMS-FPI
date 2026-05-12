using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using Backend.Services.Interfaces;

namespace Backend.Services.Implementations
{
    public class CsvService : ICsvService
    {
        private readonly CsvConfiguration _config;

        public CsvService()
        {
            _config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true,
                MissingFieldFound = null, // Bỏ qua nếu thiếu trường
                HeaderValidated = null,   // Bỏ qua nếu tiêu đề không khớp hoàn toàn
                PrepareHeaderForMatch = args => args.Header.Trim(),
                TrimOptions = TrimOptions.Trim
            };
        }

        public List<T> ReadAll<T>(string filePath)
        {
            if (!File.Exists(filePath)) return new List<T>();
            using var reader = new StreamReader(filePath);
            using var csv = new CsvReader(reader, _config);
            return csv.GetRecords<T>().ToList();
        }

        public void WriteAll<T>(string filePath)
        {
            // (Đã tích hợp trong logic Update/Delete bên dưới)
        }

        public void WriteAll<T>(string filePath, List<T> records)
        {
            using var writer = new StreamWriter(filePath);
            using var csv = new CsvWriter(writer, _config);
            csv.WriteRecords(records);
        }

        public void AppendRecord<T>(string filePath, T record)
        {
            var configAppend = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = !File.Exists(filePath) || new FileInfo(filePath).Length == 0
            };

            using var stream = File.Open(filePath, FileMode.Append);
            using var writer = new StreamWriter(stream);
            using var csv = new CsvWriter(writer, configAppend);
            csv.WriteRecord(record);
            csv.NextRecord();
        }

        public void UpdateRecords<T>(string filePath, Func<T, bool> predicate, T updatedRecord)
        {
            var records = ReadAll<T>(filePath);
            var index = records.FindIndex(new Predicate<T>(predicate));
            if (index != -1)
            {
                records[index] = updatedRecord;
                WriteAll(filePath, records);
            }
        }

        public void DeleteRecords<T>(string filePath, Func<T, bool> predicate)
        {
            var records = ReadAll<T>(filePath);
            records.RemoveAll(new Predicate<T>(predicate));
            WriteAll(filePath, records);
        }
    }
}