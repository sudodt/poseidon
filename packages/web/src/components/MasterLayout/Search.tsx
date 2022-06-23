import {useState, useEffect} from 'react';
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import styles from "./MasterLayout.module.scss";
import SearchDataService from "@/src/services/Search";
import {useRouter} from "next/router"
const items = [
  { label: "Mua bán", value: "mua-ban" },
  { label: "Cho thuê", value: "cho-thue" },
  { label: "Môi giới", value: "tim-moi-gioi" },
];
const Search = (props: any) => {
  const router = useRouter();
  const [filteredResults, setFilteredResults] = useState([]);
  const [seletedSearch, setSeletedSearch] = useState(null);
  const [searchType, setSearchType] = useState<any>(items[0]);

  const search = async(event : any) => {
    const results = await SearchDataService.search(event.query);
    if (results.data && results.data[0]) {
      setFilteredResults(mapItemLabel(results.data[0]));
    }
  };
  const onChangeSearchType = (e : any) => {
    const value = items.find(res => res.value === e.value) || {};
    setSearchType(value);
  }
  const mapItemLabel = (items : any) => {
    return items.map((res : any) => {
      return {...res, name : `${searchType.label} BĐS tại ${res.full_name}`}}
    )
  }

  const onChangeValue = (e : any) => {
    setSeletedSearch(e.value);
    if (e.value instanceof Object) {
      const url = buildRouting(
          e.value, 
          searchType.value == 'tim-moi-gioi' ? true : false);
      router.push(url);
    }
  }

  const buildRouting = (value : any, isPrefixDemand : boolean = false) => {
    const demand = searchType.value;

    if (value.parent) {
      const l2 = value.parent;
      if (l2.parent) {
        return isPrefixDemand 
          ? `/${demand}/${l2.parent?.slug}/${value.parent?.slug}/${value.slug}`
          : `/${l2.parent?.slug}/${value.parent?.slug}/${value.slug}/${demand}`
      }
      return isPrefixDemand
        ? `/${demand}/${value.parent?.slug}/${value.slug}`
        : `/${value.parent?.slug}/${value.slug}/${demand}`
    }
    return isPrefixDemand
      ? `/${demand}/${value.slug}`
      : `/${value.slug}/${demand}`
  }

  return (
    <>
      <div className="p-inputgroup">
        <Dropdown
          className={styles.selection}
          options={items}
          onChange={onChangeSearchType}
          value={searchType.value}
        />
        <AutoComplete
          value={seletedSearch}
          className={styles.input} placeholder="Tìm kiếm..." 
          suggestions={filteredResults}
          completeMethod={search}
          field="name"
          onChange={onChangeValue}
        />
      </div>
    </>
  );
};
export default Search;
