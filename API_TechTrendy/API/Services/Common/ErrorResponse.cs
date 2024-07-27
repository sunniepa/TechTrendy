﻿using System.Text.Json;

namespace API.Services.Common
{
    public class ErrorResponse
    {
        public int StatusCode { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
        //public string Details { get; set; }
        public string Path { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }


}
