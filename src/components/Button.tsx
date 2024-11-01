import React from "react";

export const Button: React.FC<{ onClick: VoidFunction, className?: string, children?: React.ReactNode }> = ({
                                                                                                                onClick,
                                                                                                                className,
                                                                                                                children
                                                                                                            }) => {
    return <button
        className={`bg-gray-200 shadow text-gray-800 rounded cursor-pointer box-border p-2 flex content-center justify-center hover:bg-gray-400 active:bg-gray-500 font-bold duration-100 ${className ? className : ''}`}
        onClick={onClick}>{children}
    </button>
}