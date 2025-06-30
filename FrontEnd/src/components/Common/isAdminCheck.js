const isAdminCheck = () => {
    const userId = localStorage.getItem("userId");
    return !!userId && userId.toLowerCase().includes("admin");
};

export default isAdminCheck;
