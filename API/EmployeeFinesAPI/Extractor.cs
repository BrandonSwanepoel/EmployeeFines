using Newtonsoft.Json;
using EmployeeFinesAPI.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace EmployeeFinesAPI
{
    public class Extractor
    {
        public static IEnumerable<T> LoadJsonItems<T>(string path)
        {
            return JsonConvert.DeserializeObject<List<T>>(ReadJsonFile(path));

            static string ReadJsonFile(string path)
            {
                using var streamReader = new StreamReader(path);
                return streamReader.ReadToEnd();
            }
        }

        public static IEnumerable<Fine> LoadJsonFinesOfEmployee(int employeeId, string path)
        {
            var employeeFines = LoadJsonItems<Fine>(path);
            return employeeFines.Where(x => x.Employee_Id == employeeId);
        }
    }
}
