import DetailRoute from "../routes/DetailRoute";
import indexedDBUtil from "../lib/indexedDBUtil";
import coupwaFetch from "../lib/coupwaFetch";
import commonUtil from "./commonUtil";

const weekDay = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const self = {
	isCachedViewBannerImage: () => {
		return indexedDBUtil
			.existsTable("coupwa", "viewBannerImage")
			.then(r => {
				if (!r) {
					return indexedDBUtil.createTable(
						"coupwa",
						"viewBannerImage",
						"key"
					);
				} else {
					return r;
				}
			})
			.then(r => {
				return indexedDBUtil.selectByKey(
					"coupwa",
					"viewBannerImage",
					commonUtil.getDateFormat("YYMMDD")
				);
			})
			.then(r => {
				if (!r || !r.result) return false;
				else return r;
			});
	},
	existsCacheViewBannerImage: () => {
		return indexedDBUtil
			.isNotExistCreateTable("coupwa", "viewBannerImage", "key")
			.then(r => {
				if (!r) return false;
				return indexedDBUtil.selectByKey(
					"coupwa",
					"viewBannerImage",
					commonUtil.getDateFormat("YYMMDD")
				);
			})
			.then(r => {
				if (!r) return false;
				else if (r.result !== undefined) {
					return false;
				}
				return true;
			});
	},
	storeCacheViewBannerImage: bool => {
		return Promise.resolve(bool)
			.then(r => {
				if (!r) return false;
				return coupwaFetch.fetchViewBannerImage();
			})
			.then(r => {
				if (!r) return false;
				return {
					key: commonUtil.getDateFormat("YYMMDD"),
					data: r
				};
			})
			.then(r => {
				if (!r) return false;
				return indexedDBUtil.insert("coupwa", "viewBannerImage", r);
			});
	},
	isCachedViewToon: sort_type => {
		return indexedDBUtil
			.existsTable("coupwa", "viewToon")
			.then(r => {
				if (!r) {
					return indexedDBUtil.createTable(
						"coupwa",
						"viewToon",
						"key"
					);
				} else {
					return r;
				}
			})
			.then(r => {
				return indexedDBUtil.selectByKey(
					"coupwa",
					"viewToon",
					commonUtil.getDateFormat("YYMMDD") + "_" + sort_type
				);
			})
			.then(r => {
				if (!r || !r.result) return false;
				else return r;
			});
	},
	existsCacheViewToon: () => {
		return indexedDBUtil
			.isNotExistCreateTable("coupwa", "viewToon", "key")
			.then(r => {
				if (!r) return false;
				return indexedDBUtil.selectByKey(
					"coupwa",
					"viewToon",
					commonUtil.getDateFormat("YYMMDD") +
						"_" +
						"ViewCount" +
						"_" +
						weekDay[0]
				);
			})
			.then(r => {
				if (!r) return false;
				else if (r.result !== undefined) {
					return false;
				}
				return true;
			});
	},
	storeCacheViewToon: bool => {
		let result = [];
		return Promise.resolve(bool)
			.then(r => {
				if (!r) return false;
				return coupwaFetch.fetchViewToon("ViewCount");
			})
			.then(r => {
				if (!r) return false;
				result.push({
					key: commonUtil.getDateFormat("YYMMDD") + "_" + "ViewCount",
					data: r
				});
				return coupwaFetch.fetchViewToon("StarScore");
			})
			.then(r => {
				if (!r) return false;
				result.push({
					key: commonUtil.getDateFormat("YYMMDD") + "_" + "StarScore",
					data: r
				});
				return coupwaFetch.fetchViewToon("TitleName");
			})
			.then(r => {
				if (!r) return false;
				result.push({
					key: commonUtil.getDateFormat("YYMMDD") + "_" + "TitleName",
					data: r
				});
				return coupwaFetch.fetchViewToon("Update");
			})
			.then(r => {
				if (!r) return false;
				result.push({
					key: commonUtil.getDateFormat("YYMMDD") + "_" + "Update",
					data: r
				});
				return result;
			})
			.then(r => {
				if (!r) return false;
				return indexedDBUtil.insertList("coupwa", "viewToon", r);
			});
	}
};

export default self;
