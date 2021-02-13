import React, { useRef } from 'react'
interface TodoFormProps{
    onAdd(title:string): void
}

export const TodoForm: React.FC <TodoFormProps> = ({onAdd}) => {
    const ref = useRef<HTMLInputElement>(null);
    // const [title, setTitle] = useState<string>('');
    // const changeHandler =(event: React.ChangeEvent<HTMLInputElement>) =>{
    //     setTitle (event.target.value);
    // }
    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key == "Enter") {
            onAdd(ref.current!.value);
            ref.current!.value = '';
            
            // console.log(title);
            // setTitle('');
        }
    }
    return (
        <div className="input-field mt2">
            <input
                ref={ref}
                onKeyPress={keyPressHandler}
                // onChange ={changeHandler}
                // value={title}
                type="text"
                id="title"
                placeholder=" Введите задачу" />
            <label htmlFor="title" className="active">Введите задачу</label>
        </div>
    )
}