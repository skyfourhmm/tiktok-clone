import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useRef } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import * as searchServices from '../../../../src/apiServices/searchServices'
import { Wrapper as PopperWrapper } from "../../../components/Popper/index.js";
import AccountItem from "../../../components/AccountItem/AccountItem.js";
import { useDebounce } from "../../../hooks/index.js";

function Search() {
  const [search, setSearch] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearch([]);
      return;
    }

    setLoading(true);

    // request.get(
    //   `https://tiktok.fullstack.edu.vn/api/users/search`, {
    //     params: {
    //       q: debounced,
    //       type: 'less'
    //     }
    //   }
    // )
    //   .then((res) => {
    //     setSearch(res.data.data);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });

      const fetchApi = async () => {
        setLoading(true)

        const result = await searchServices.search(debounced)
        setSearch(result)

        setLoading(false)
      }

      fetchApi()

  }, [debounced]);

  const handleChangeInput = (e) => {
    const inputSearch = e.target.value;

    if (!inputSearch.startsWith(" ")) setSearchValue(inputSearch);
  };

  return (
    // thêm div bên ngoài tippy là do hiển thị lỗi warning thêm vào để hết  
    <div>
      <HeadlessTippy
        onClickOutside={() => {
          setShowResult(false);
        }}
        interactive={true}
        visible={showResult && search.length > 0}
        render={(attrs) => (
          <div className="w-361" tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className="text-gray-400 px-3 py-2">You may like</h4>
              {search.map((itemUser) => {
                return <AccountItem key={itemUser.id} data={itemUser} />;
              })}
            </PopperWrapper>
          </div>
        )}
      >
        <div className="bg-slate-100 h-20 flex items-center mt-1 pl-10 rounded-full hover:border border-solid border-gray-500 focus-within:border overflow-hidden parent-glass">
          <input
            ref={inputRef}
            className="bg-slate-100 pr-44 outline-none"
            placeholder="Search"
            spellCheck={false}
            onFocus={() => {
              setShowResult(true);
            }}
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={searchValue}
          ></input>
          {!!searchValue && !loading && (
            <button
              className="pr-3"
              onClick={() => {
                setSearchValue("");
                inputRef.current.focus();
              }}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-gray-400 "
              />
            </button>
          )}
          {loading && (
            <button className="pr-3">
              <FontAwesomeIcon icon={faSpinner} className="text-gray-400 animate-spin" />
            </button>
          )}
          <button className="w-full h-full px-8 opacity-50 hover:bg-gray-300 hover:text-black children-glass">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-3xl" />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
