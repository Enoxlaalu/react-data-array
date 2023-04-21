import React, {useCallback, useMemo, useState} from "react";
import ReactDOM from 'react-dom';
import './index.css';


// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.
//
// Feel free to change the component structure at will.

const SelectedItem = React.memo(({ item }) => {
    return (
        <li key={item}>{item}</li>
    )
})

const ListItem = React.memo(({ item, selectedItem, onClick }) => {
    return (
        <li className={`List__item List__item--${item.color} ${selectedItem ? 'List__item--selected' : ''}`} onClick={onClick}>
            {item.name}
        </li>
    )
})

const List = ({ items }) => {
    const [selected, setSelected] = useState([])

    return (
        <>
            {
                selected.length ?
                    <>
                        <h2>Selected Items:</h2>
                        <ul className="SelectedList">
                            {selected.map(item => {
                                return <SelectedItem item={item} />
                            })}
                        </ul>
                    </> : null
            }
            <ul className="List">
                {items.map(item => {
                    const selectedItem = selected.includes(item.name)

                    const onClick = useCallback(() => {
                        setSelected(prevState => prevState.includes(item.name) ? prevState.filter(el => el !== item.name) : [...prevState, item.name])
                    }, [])

                    return (
                        <ListItem key={item.name} item={item} selectedItem={selectedItem} onClick={onClick} />
                    )
                })}
            </ul>
        </>
    )
}

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
    (items, size) => [
        ...items,
        ...fruits.reduce(
            (acc, fruit) => [
                ...acc,
                ...colors.reduce(
                    (acc, color) => [
                        ...acc,
                        {
                            name: `${size} ${color} ${fruit}`,
                            color,
                        },
                    ],
                    [],
                ),
            ],
            [],
        ),
    ],
    [],
);

ReactDOM.render(
    <List items={items}/>,
    document.getElementById('root')
);