const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                The app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            Button Press History: {props.allClicks.join(' ')}
        </div>
    )
}

export default History;