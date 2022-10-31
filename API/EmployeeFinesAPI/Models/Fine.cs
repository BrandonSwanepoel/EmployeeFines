namespace EmployeeFinesAPI.Models
{
    public class Fine
    {
        public int Id { get; set; }
        public int Employee_Id { get; set; }
        public string Date { get; set; }
        public string Value { get; set; }
    }
}
