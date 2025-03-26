import useUserStore from "./UserStore"

export default function FirstName() {
    const firstName = useUserStore((state) => state.user.name.firstName);
    console.log("Rendered FirstName")
    return (
        <div>
            <p>
                {firstName}
            </p>
        </div>
    )
}
