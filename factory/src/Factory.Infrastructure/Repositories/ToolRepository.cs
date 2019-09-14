using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.ToolAggregate;
using Factory.Domain.Repositories;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Factory.Infrastructure.Repositories
{
    public class ToolRepository : IToolRepository
    {
        private readonly FactoryContext _context;
        private const int DefaultTake = 50;

        public ToolRepository(FactoryContext context)
        {
            _context = context;

        }
        
        public async Task<Tool> GetByName(string name)
        {
            return await _context.Set<Tool>().FirstOrDefaultAsync(e => e.Name == name);
        }

        public async Task<Tool> FirstOrDefault(Expression<Func<Tool, bool>> predicate)
        {
            return await _context.Set<Tool>().FirstOrDefaultAsync(predicate);
        }

        public async Task<Tool> Create(Tool entity)
        {
            await _context.Set<Tool>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Tool> Update(Tool entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;        }

        public async Task Delete(Tool entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();        }

        public async Task<IEnumerable<Tool>> GetAll(int skip, int take)
        {
            return await _context.Set<Tool>().Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Tool>> GetAll()
        {
            return await _context.Set<Tool>().AsNoTracking().ToListAsync();
        }
        
    }
}