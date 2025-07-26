export default function Task(props){
    return(
        <div className="task">
            <div className="part-of-start">
                <button type="submit" className="task-button" id={props.isCompleted?"complete":"not_yet"} onClick={() => props.finished_function(props.id)}></button>
                <p className={props.isCompleted?"finished":null}>{props.text}</p>
            </div>
            <div className="part-of-end">
                <button type="submit" className="task-button"><img src="src/assets/update.svg" alt="update-icon"></img></button>
                <button type="submit" className="task-button"><img src="src/assets/delete.svg" alt="delete-icon"></img></button>

            </div>
        </div>
    )
}