import "./MealPlan.css"
import {useEffect, useState} from "react";

export default function MealPlanCalendar(props) {
    const CALENDAR_DAY_COUNT = 7;
    let datesList = [];
    let [mealPlan, setMealPlan] = useState(null);
    let WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        fetch("get meal plan url api")
            .then(response => response.json())
            .then(data => setMealPlan(data));
    }, [mealPlan]);

    if (!mealPlan) return <div>Loading...</div>;

    function makeCalendar() {
        const today = new Date();
        let day = today;
        datesList = [];
        datesList.push(
            {
                date: today.getDate(),
                month: today.getMonth()+1,
                year: today.getFullYear(),
                day: today.getDay()
            });
        for (let i=1; i < CALENDAR_DAY_COUNT; i++) {
            day.setDate(today.getDate()+1);
            datesList.push(
                {
                    date: day.getDate(),
                    month: day.getMonth()+1,
                    year: day.getFullYear(),
                    day: day.getMonth()
                });

        }
        console.log(datesList);
    }

    function makeHeader() {
        makeCalendar();
        let headerList = [];
        datesList.map(dateDay => (
            headerList.push(
                <td>
                    {dateDay.day}
                    {WEEK_DAYS[dateDay.day]}
                </td>
            )
        ))
    }

    function fillCalendar() {
        return null;
    }

    return (
        <div>
            <table>
                <tr>
                    {makeHeader()}
                </tr>
                <tr>
                    {fillCalendar()}
                </tr>
            </table>
            {makeCalendar()}
        </div>
    )
}