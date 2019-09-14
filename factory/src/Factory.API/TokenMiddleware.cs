using System.Net;
using System.Threading.Tasks;
using Factory.API.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace Factory.API
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly TokenRepository _tokenRepository = new TokenRepository();

        public TokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            bool validToken = false;
            string reqPath = context.Request.Path.Value;
            if (reqPath.StartsWith("/api/v1/swagger") || reqPath.StartsWith("/swagger"))
            {
                await _next.Invoke(context);
            }
            else{
                //Require HTTPS
                if (context.Request.IsHttps)
                {
                    //Token header exists in the request
                    if (context.Request.Headers.ContainsKey("Authorization"))
                    {
                        StringValues token;
                        context.Request.Headers.TryGetValue("Authorization", out token);
                        //Check for a valid device by API token in my DB and set validToken to true if found
                        if (_tokenRepository.isValidtoken(token))
                        {
                            validToken = true;
                        }
                    }

                    if (!validToken)
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                        await context.Response.WriteAsync("Invalid Token");
                    }
                    else
                    {
                        await _next.Invoke(context);
                    }
                }
                else
                {
                    context.Response.StatusCode = (int)HttpStatusCode.HttpVersionNotSupported;
                    await context.Response.WriteAsync("HTTP not supported");
                }
            }
          
        }
    }

    public static class TokenExtensions
    {
        public static IApplicationBuilder UseTokenAuth(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<TokenMiddleware>();
        }
    }
}