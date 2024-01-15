export default function Product(){
    return(
        <div className="mx-auto mt-11 w-40 h-56 overflow-hidden transform rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
            <img className="h-24 w-full object-cover object-center" src="https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Product" />
            <div className="p-2">
                <h2 className="mb-1 text-sm font-medium dark:text-white text-gray-900">Product Name</h2>
                <p className="mb-1 text-xs dark:text-gray-300 text-gray-700">Product description goes here.</p>
                <div className="flex items-center">
                    <p className="mr-1 text-sm font-semibold text-gray-900 dark:text-white">$20.00</p>
                </div>
            </div>
        </div>
    );
}