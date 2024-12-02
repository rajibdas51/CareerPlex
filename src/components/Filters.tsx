import React from 'react';

const Filters = ({
  filters,
  setFilters,
  getData,
}: {
  filters: any;
  setFilters: any;
  getData: any;
}) => {
  return (
    <div className='flex  gap-3 my-3 items-center'>
      <div>
        <span>Search Jobs</span>
        <input
          type='text'
          value={filters.searchText}
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
        />
      </div>
      <div>
        <span>Location</span>
        <select
          value={filters.locaion}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value='bangladesh'>Bangladesh</option>
          <option value='usa'>USA</option>
          <option value='germany'>Germany</option>
          <option value='netherlands'>Netherlands</option>
          <option value='india'>India</option>
        </select>
      </div>
      <button className='' onClick={getData}>
        Filter
      </button>
    </div>
  );
};

export default Filters;
