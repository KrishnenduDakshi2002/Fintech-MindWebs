import React, { createContext, useContext, useState } from 'react'

interface SuccessExpenseContextInterface{
    reloadOnSuccess : boolean;
    setReloadOnSuccess : React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessExpenseContext = createContext<SuccessExpenseContextInterface>({
    reloadOnSuccess : false,
    setReloadOnSuccess : () => {}
});

export function useSuccessExpenseContext(){
    return useContext(SuccessExpenseContext);
}

const ExpenseContext = ({children}:{children:JSX.Element}) => {
    const [reload, setReload] = useState(false);
  return (
    <SuccessExpenseContext.Provider value={{
        reloadOnSuccess : reload,
        setReloadOnSuccess : setReload
    }}>
        {children}
    </SuccessExpenseContext.Provider>
  )
}

export default ExpenseContext