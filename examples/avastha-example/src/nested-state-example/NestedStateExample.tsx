import useUserStore from "./UserStore";
import { useRef } from "react";
import FirstName from "./FirstName";
import LastName from "./LastName";

export default function NestedStateExample() {
    const setFirstName = useUserStore((state) => state.setUserFirstName);
    const setLastName = useUserStore((state) => state.setUserLastName);
    const inputElementRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    console.log("Rendered Nested State")
    return (
        <div>
            <h1>
                Nested State Example
            </h1>
            <div style={{ display: "flex", gap: 4 }}>
                <FirstName />
                <LastName />
            </div>
            <input ref={inputElementRef} placeholder="Enter name" />
            <button onClick={() => setFirstName(inputElementRef.current?.value || "Default First Name")}>
                Set First Name
            </button>
            <button onClick={() => setLastName(inputElementRef.current?.value || "Default Last Name")}>
                Set Last Name
            </button>
            <p>
                <span>Automatically set the first name as you type</span><br />
                <input ref={firstNameRef} placeholder="Enter first name" onChange={(e) => setFirstName(e.target.value)} />
            </p>
        </div>

    )
}
