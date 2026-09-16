import { useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AddUser, ChangePassword, ThemeToggle } from "../components";
import { useLogoutMutation } from "../redux/slices/api/authApiSlice";
import { logout } from "../redux/slices/authSlice";
import { getInitials } from "../utils";

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();
  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/log-in");
    } catch (error) {
      toast.error("Unable to log out. Please try again.");
    }
  };

  return (
    <div className='max-w-4xl mx-auto py-4'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Settings
        </h1>
        <p className='mt-1 text-gray-500 dark:text-gray-400'>
          Manage your account and workspace preferences.
        </p>
      </div>

      <div className='space-y-5'>
        <section className='rounded-lg bg-white p-6 shadow-sm dark:bg-[#1f1f1f]'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white'>
                {getInitials(user?.name || "User")}
              </div>
              <div>
                <h2 className='font-semibold text-gray-900 dark:text-white'>
                  {user?.name}
                </h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {user?.email}
                </p>
                <p className='text-sm capitalize text-blue-600'>
                  {user?.role || (user?.isAdmin ? "Administrator" : "Member")}
                </p>
              </div>
            </div>
            <button
              type='button'
              onClick={() => setOpenProfile(true)}
              className='flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
            >
              <FaUser aria-hidden='true' />
              Edit profile
            </button>
          </div>
        </section>

        <section className='rounded-lg bg-white p-6 shadow-sm dark:bg-[#1f1f1f]'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
            Security
          </h2>
          <div className='mt-4 flex items-center justify-between gap-4 border-t border-gray-100 pt-4 dark:border-gray-700'>
            <div>
              <p className='font-medium text-gray-800 dark:text-gray-200'>
                Password
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Update your account password.
              </p>
            </div>
            <button
              type='button'
              onClick={() => setOpenPassword(true)}
              className='flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700'
            >
              <FaUserLock aria-hidden='true' />
              Change password
            </button>
          </div>
        </section>

        <section className='rounded-lg bg-white p-6 shadow-sm dark:bg-[#1f1f1f]'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
            Appearance
          </h2>
          <div className='mt-4 flex items-center justify-between gap-4 border-t border-gray-100 pt-4 dark:border-gray-700'>
            <div>
              <p className='font-medium text-gray-800 dark:text-gray-200'>
                Theme
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Choose the appearance for TaskMe.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </section>

        <section className='rounded-lg bg-white p-6 shadow-sm dark:bg-[#1f1f1f]'>
          <button
            type='button'
            onClick={logoutHandler}
            className='flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700'
          >
            <MdLogout aria-hidden='true' />
            Sign out
          </button>
        </section>
      </div>

      <AddUser open={openProfile} setOpen={setOpenProfile} userData={user} />
      <ChangePassword open={openPassword} setOpen={setOpenPassword} />
    </div>
  );
};

export default Settings;
