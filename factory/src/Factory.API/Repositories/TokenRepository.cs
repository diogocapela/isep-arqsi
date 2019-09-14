using System;
using System.Collections.Generic;

namespace Factory.API.Repositories
{
    public class TokenRepository
    {
        //in mem, only for mocking
        private List<String> validTokens = new List<String>();
        public TokenRepository()
        {
            //mocking token api keys
            validTokens.Add("VH0bxo3PB4WJjUc4xxLzmZO9Wu7xowtc");
        }

        public Boolean isValidtoken(String token)
        {
            if (validTokens.Contains(token))
                return true;
            else
                return false;
        }
    }
}