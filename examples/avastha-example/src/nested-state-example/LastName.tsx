import useUserStore from "./UserStore"

export default function LastName() {
    const lastName = useUserStore((state) => state.user.name.lastName);
    console.log("Rendered LastName")
    return (
        <div>
            <p>
                {lastName}
            </p>
        </div>
    )
}
