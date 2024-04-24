/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { FormEvent, ReactElement, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useAllCouponsQuery, useDeleteCouponMutation, useNewCouponMutation } from "../../../redux/api/couponAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import TableHOC from "../../../components/admin/TableHOC";
import { Column } from "react-table";
import { Skeleton } from "../../../components/loader";
import { FaTrash } from "react-icons/fa";

interface DataType {
  coupon: string;
  amount: number;
  _id:string;
  action:ReactElement;
}
const columns: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id"
  },
  {
    Header: "Coupon",
    accessor: "coupon"
  },
  {
    Header: "Amount",
    accessor: "amount"
  },
 {
    Header: "Action",
    accessor: "action"
  }]
const Coupon = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [coupon, setCoupon] = useState<string>();
  const [amount, setAmount] = useState<number>();
  
  const [newCoupon] = useNewCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

    const deleteHandler = async (id:string) => {
    const res = await deleteCoupon({
      userId: user?._id!,
      couponId: id
    });
    responseToast(res, navigate, "/admin/app/coupon");
  }

  const { isLoading, isError, error, data } = useAllCouponsQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.coupons.map((i) => ({
          coupon: i.coupon,
          amount: i.amount,
          _id:i._id,
          action: <button onClick={()=>deleteHandler(i._id)}><FaTrash/></button>
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Coupon",
    rows.length > 6
  )();


  const navigate=useNavigate()

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!coupon || !amount)return console.log(" coupon is not" );
    const data = {
     "coupon": coupon,
      "amount": amount
  }
    const res = await newCoupon({ id: user?._id!, data });
    console.log(res);
    responseToast(res, navigate, "/admin/app/coupon");
  
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <section>
          <form className="coupon-form" onSubmit={submitHandler}>
        <h1>Create Coupon</h1>
            <div>

            <label>Coupon</label>
            <input
              required
              type="text"
              placeholder="Text to include"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              />
              
              </div>

              <div>
              <label>Amount</label>
            <input
              required
              type="number"
              placeholder="type amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              />
              
              </div>
            <button type="submit">Generate</button>
          </form>

        </section>
      {isLoading ? <Skeleton length={20} /> : Table}

      </main>
    </div>
  );
};

export default Coupon;
