import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import loadingImg from "../../images/loading.gif";

function Search(props) {
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef();

  const [users, setUsers] = useState([]);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (searchRef.current.value && search === searchRef.current.value) {
  //       getDataAPI(`search?username=${search}`, auth.token)
  //         .then((result) => {
  //           setUsers(result.data.users);
  //         })
  //         .catch((err) => {
  //           dispatch({
  //             type: GLOBALTYPES.ALERT,
  //             payload: {
  //               error: err.response.data.msg,
  //             },
  //           });
  //         });
  //     } else {
  //       setUsers([]);
  //     }
  //   }, 300);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [search, auth.token, dispatch]);

  const handleCloseSearch = () => {
    setSearch("");
    setUsers([]);
  };

  const handleChangeSearch = (e) => {
    const value = e.target.value.toLowerCase().replace(/ /g, "");
    setSearch(value);

    if (searchRef.current) clearTimeout(searchRef.current);

    // deboune search using useRef to save current value
    searchRef.current = setTimeout(() => {
      if (value) {
        try {
          const getDataSearch = async () => {
            setLoad(true);
            const res = await getDataAPI(
              `search?username=${value}`,
              auth.token
            );
            setLoad(false);
            setUsers(res.data.users);
          };

          getDataSearch();
        } catch (error) {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: error.response.data.msg,
          });
        }
      } else {
        setUsers([]);
      }
    }, 500);
  };

  return (
    <form className="form_search">
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        ref={searchRef}
        onChange={handleChangeSearch}
      />
      <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">search</span>
        <span>Search...</span>
      </div>
      {search && (
        <div className="close_search" onClick={handleCloseSearch}>
          {load || <span>&times;</span>}
          {load && <img src={loadingImg} alt="loading..." />}
        </div>
      )}
      <div className="search-users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              handleCloseSearch={handleCloseSearch}
            />
          ))}
      </div>
    </form>
  );
}

export default Search;
