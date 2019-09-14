using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.Repositories;
using Production.Infrastructure.Persistence;

namespace Production.Infrastructure.Repositories
{
    public class ManufacturingPlanRepository : IManufacturingPlanRepository
    {
        private readonly ProductionContext _context;

        public ManufacturingPlanRepository(ProductionContext context)
        {
            _context = context;
        }
        
        public async Task<ManufacturingPlan> GetById(int id)
        {
            return await _context.Set<ManufacturingPlan>().Include(p=>p.LstOperations).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<ManufacturingPlan> FirstOrDefault(Expression<Func<ManufacturingPlan, bool>> predicate)
        {
            return await _context.Set<ManufacturingPlan>().Include(p => p.LstOperations).Where(predicate)
                .FirstOrDefaultAsync();
        }
        public async Task<ManufacturingPlan> Create(ManufacturingPlan entity)
        {
            await _context.Set<ManufacturingPlan>().AddAsync(entity);
            
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<ManufacturingPlan> Update(ManufacturingPlan entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(ManufacturingPlan entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ManufacturingPlan>> GetAll(int from, int to)
        {
            return await _context.Set<ManufacturingPlan>().Include(p=> p.LstOperations).Skip(from).Take(to).ToListAsync();
        }

        public async Task<IEnumerable<ManufacturingPlan>> GetAll()
        {            
            return await _context.Set<ManufacturingPlan>().Include(p=> p.LstOperations).Skip(0).Take(50).ToListAsync();
        }

        public async Task<IEnumerable<ManufacturingPlan>> GetWhere(Expression<Func<ManufacturingPlan, bool>> predicate, int skip, int take)
        {
            return await _context.Set<ManufacturingPlan>().Include(p=> p.LstOperations).Skip(skip).Take(take).Where(predicate).ToListAsync();

        }
    }
}