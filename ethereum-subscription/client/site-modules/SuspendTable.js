import React from "react";
import SortableTable from "../containers/SortableTable";
import {hideOnMobile} from "../services/constants/css";
import {LoaderSmall} from "../modules/icons";

export const SuspendTable = ({
    isLoading = false,
    thead = [],
    renderTd = () => {},
    suppliers = []
}) => {
    return (
        <SortableTable>
            <thead>
                <tr>
                    <th>Username:</th>
                    <th>Email:</th>
                    <th>Rating:</th>
                    {thead}
                </tr>
            </thead>
            <tbody>
                {(isLoading) ? (
                    <tr className="text-center">
                        <td colSpan={3 + thead.length}>
                            <LoaderSmall/>
                        </td>
                    </tr>
                ) : (
                    suppliers.map((supplier, i) => {
                        return (
                            <tr key={i}>
                                <td>{supplier.username}</td>
                                <td style={{wordBreak: "break-all"}}>{supplier.email}</td>
                                <td className={hideOnMobile()}>{supplier.rating}</td>
                                {renderTd(supplier, i)}
                            </tr>
                        );
                    })
                )}
            </tbody>
        </SortableTable>
    );
};