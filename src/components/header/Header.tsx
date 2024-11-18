import { AutoComplete, Input } from "antd";
import type { AutoCompleteProps } from 'antd';
import { useState } from "react";

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const Header: React.FC = () => {
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

    const onSelect = (value: string) => {
      console.log('onSelect', value);
    };
  
    const handleSearch = (value: string) => {
      setOptions(value ? searchResult(value) : []);
    };;
    return (
      <div className="header">
        <AutoComplete
          popupMatchSelectWidth={500}
          style={{ width: 500 }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          size="large"
        >
          <Input.Search size="large" placeholder="Search your videos" enterButton />
        </AutoComplete>
      </div>
    )};

export default Header;
