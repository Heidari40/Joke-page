using System;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json; // install with NuGet

namespace TestHttpRequest
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.Write("\n");

            Joke randomJoke = await GetJoke();
            if (randomJoke.type == "single")
            {
                Console.WriteLine(randomJoke.joke);
            }
            else
            {
                Console.WriteLine(randomJoke.setup);
                Console.WriteLine("...");
                System.Threading.Thread.Sleep(3000);
                Console.WriteLine(randomJoke.delivery);
            }

            Console.Write("\n");
        }

        public async static Task GetJoke()
        {
            const string baseUrl = "https://v2.jokeapi.dev";
            string[] categories = { "Programming", "Miscellaneous", "Pun" };
            string[] parameters = {
                "blacklistFlags=nsfw,religious,racist,sexist",
                "idRange=0-100",
                "safe-mode",
                "lang=en"
            };
            string requestUrl = $"{baseUrl}/joke/{string.Join(",", categories)}?{string.Join("&", parameters)}";
            Joke randomJoke;

            using (var httpClient = new HttpClient())
            {
                var json = await httpClient.GetStringAsync(requestUrl);
                randomJoke = JsonConvert.DeserializeObject(json);
            }

            return randomJoke;
        }
    }

    public class Joke
    {
        public string type { get; set; }
        public string joke { get; set; }
        public string setup { get; set; }
        public string delivery { get; set; }
        public Flags flags { get; set; }
        public int id { get; set; }
        public bool safe { get; set; }
        public string lang { get; set; }
    }

    public class Flags
    {
        public bool nsfw { get; set; }
        public bool religious { get; set; }
        public bool political { get; set; }
        public bool racist { get; set; }
        public bool sexist { get; set; }
        public bool @explicit { get; set; } // use @ since "explicit" is a reserved keyword
    }
}