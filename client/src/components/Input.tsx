export default function Input({...props}: { 
    name: string, 
    id: string, 
    type: string, 
    autoComplete: string,
    label: string
}) {
    return (
        <div>
            <label htmlFor={props.name} className="block text-sm font-medium leading-5 text-white">
                {props.label}
            </label>
            <div className="mt-1">
                <input
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    autoComplete={props.autoComplete}
                    required
                    className="block w-full rounded-md border-0 py-1 px-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-5"
                />
            </div>
        </div>
    );
}