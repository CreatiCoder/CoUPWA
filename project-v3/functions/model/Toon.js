//웹툰
module.exports = function Toon(
	toon_idx,
	toon_sort_type,
	toon_week_day,
	toon_rank,
	toon_info_idx
) {
	// 날짜 8자리 + 순번 3자리
	this.toon_idx = toon_idx;
	// 정렬 방식: Update, ViewCount, StarScore, TitleName
	this.toon_sort_type = toon_sort_type;
	// 요일
	this.toon_week_day = toon_week_day;
	// 순위
	this.toon_rank = toon_rank;
	// 웹툰 정보 번호
	this.toon_info_idx = toon_info_idx;
	// 삭제여부
	this.toon_delete_at = false;
};
