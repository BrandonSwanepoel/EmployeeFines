using EmployeeFinesAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeFinesAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class Employees : ControllerBase
    {
        private readonly string path = "../../Data/Employees.json";

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            try
            {
                return Extractor.LoadJsonItems<Employee>(path);
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
        }

        [HttpPost]
        public bool Post(Employee employee)
        {
            try
            {
                var employeeList = Extractor.LoadJsonItems<Employee>(path).ToList();

                if (employee.Id == -1)
                    employee.Id = employeeList.Count() + 1;

                if (employeeList.FirstOrDefault(x => x.Id.Equals(employee.Id)) != null)
                {
                    var itemToRemove = employeeList.First(r => r.Id == employee.Id);
                    employeeList.Remove(itemToRemove);
                }
                employeeList.Add(employee);
                employeeList.Sort((x, y) => x.Id.CompareTo(y.Id));

                var jsonData = JsonConvert.SerializeObject(employeeList);
                System.IO.File.WriteAllText(path, jsonData);
                return true;
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
        }
    }
}
