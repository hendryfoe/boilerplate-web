import React, { useCallback, useContext, useMemo, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChildrenProps } from 'types';
import { parseQueryString, toQueryString } from 'utils/request.util';

enum FilterActionType {
  SetFilter = 'SET_FILTER',
  ResetFilter = 'RESET_FILTER'
}

type FilterActions = { type: FilterActionType.SetFilter; payload: any } | { type: FilterActionType.ResetFilter };

function filterReducer(state: any, action: FilterActions) {
  switch (action.type) {
    case FilterActionType.SetFilter: {
      return { ...state, ...action.payload };
    }

    case FilterActionType.ResetFilter: {
      return {};
    }

    default: {
      return state;
    }
  }
}

const useFilterReducer = (initialState: any) => {
  const [filters, dispatch] = useReducer<React.Reducer<any, FilterActions>>(filterReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;

  const setFilters = useCallback(
    (payload: { [key: string]: any }) => {
      dispatch({ type: FilterActionType.SetFilter, payload });
      const queryString = toQueryString({ ...filters, ...payload });
      // history.replace(`${currentPathname}${queryString}`);
      navigate({ search: queryString });
    },
    [navigate, filters]
  );

  const resetFilters = useCallback(() => {
    dispatch({ type: FilterActionType.ResetFilter });
    navigate({
      pathname: currentPathname
    });
  }, [navigate, currentPathname]);

  return { filters, setFilters, resetFilters };
};

export interface FilterContextProps {
  filters: any;
  setFilters: (payload: any) => void;
  resetFilters: VoidFunction;
}

interface FilterProviderProps extends ChildrenProps {
  initialFilterState?: { [key: string]: any };
  excludeFilterKeys?: string[];
}

export const FilterContext = React.createContext<FilterContextProps>(undefined!);

export const FilterProvider: React.FC<FilterProviderProps> = ({ children, initialFilterState }) => {
  const { search } = useLocation();
  const currentQuerystringObject = parseQueryString(search) ?? {};
  const initialState = { ...initialFilterState, ...currentQuerystringObject };
  const { filters, setFilters, resetFilters } = useFilterReducer(initialState);

  const value = useMemo(() => ({ filters, setFilters, resetFilters }), [filters, resetFilters, setFilters]);

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export function useFilters() {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error('FilterContext must be used within a FilterProvider');
  }

  return context;
}
