using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.Repositories;
using Factory.Domain.SeedWork;
using Factory.Domain.Services;


namespace Factory.Infrastructure.Repositories
{
    public class MachineTypeRepository : IMachineTypeRepository
    {
        private readonly FactoryContext _context;
        private const int DefaultTake = 50;
        
        public MachineTypeRepository(FactoryContext context)
        {
            _context = context;
        }
        
        public async Task<MachineType> GetById(int id)
        {
            return await _context.Set<MachineType>().Include(mto => mto.machineTypeOperations).FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<MachineType> FirstOrDefault(Expression<Func<MachineType, bool>> predicate)
        {
            return await _context.Set<MachineType>().Include(mto => mto.machineTypeOperations).FirstOrDefaultAsync(predicate);
        }

        public async Task<MachineType> Create(MachineType entity)
        {
            await _context.Set<MachineType>().AddAsync(entity);
            
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<MachineType> Update(MachineType entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(MachineType entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<MachineType>> GetAll(int skip, int take)
        {
            return await _context.Set<MachineType>().Include( mto => mto.machineTypeOperations).Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<MachineType>> GetAll()
        {
            return await _context.Set<MachineType>().Include( mto => mto.machineTypeOperations).Take(DefaultTake).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<MachineType>> GetWhere(Expression<Func<MachineType, bool>> predicate, int skip, int take)
        {
            return await _context.Set<MachineType>().Include( mto => mto.machineTypeOperations).Where(predicate).Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }
    }
}