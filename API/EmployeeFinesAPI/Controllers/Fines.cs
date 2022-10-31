using EmployeeFinesAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace EmployeeFinesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Fines : ControllerBase
    {
        private readonly string path = "../../Data/Fines.json";

        [HttpGet("{id}")]
        public IEnumerable<Fine> Post(int id)
        {
            try
            {
                return Extractor.LoadJsonFinesOfEmployee(id, path);
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
        }

        [HttpPost]
        public bool Post(Fine fine)
        {
            try
            {
                var fineList = Extractor.LoadJsonItems<Fine>(path).ToList();

                if (fine.Id != -1 && fineList.FirstOrDefault(x => x.Id.Equals(fine.Id)) != null)
                {
                    var itemToRemove = fineList.First(r => r.Employee_Id == fine.Employee_Id);
                    fine.Employee_Id = itemToRemove.Employee_Id;
                    fineList.Remove(itemToRemove);
                }
                else
                {
                    fine.Id = fineList.Count() + 1;
                }

                fineList.Add(fine);
                SortDesc(fineList);

                var jsonData = JsonConvert.SerializeObject(fineList);
                System.IO.File.WriteAllText(path, jsonData);
                return true;
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }

            static void SortDesc(List<Fine> fineList)
            {
                for (int i = 0; i < fineList.Count(); i++)
                {
                    fineList[i].Value = Regex.Replace(fineList[i].Value, "[^0-9.]", "");
                }

                fineList.Sort((x, y) => double.Parse(y.Value).CompareTo(double.Parse(x.Value)));
            }
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            try
            {
                var fineList = Extractor.LoadJsonItems<Fine>(path).ToList();

                var itemToRemove = fineList.First(r => r.Id == id);
                fineList.Remove(itemToRemove);

                var jsonData = JsonConvert.SerializeObject(fineList);
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
