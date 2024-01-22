import Input from "../components/Input";
import Button from "../components/Button";

import React from "react";
import { getOrder } from "../lib/order";

export default function Admin() {
    const [id, setId] = React.useState("");


    return (
        <>
            <h1 className="pb-4" >Change Order Status</h1>
            <Input
                name="orderId"
                type="text"
                placeholder="Order ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <Button className="mt-4" onClick={() => getOrder(id)}>Search</Button>
        </>
    );
}