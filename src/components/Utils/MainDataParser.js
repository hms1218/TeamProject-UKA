// src/utils/dataParser.js

/**
 * 지역 데이터에서 센터/동물/강아지/고양이/기타 수를 집계해 반환
 * @param {Array} data - 지역별 동물 데이터
 * @param {String} name - 지역 이름 (선택)
 * @returns {Object} - { name, centerCount, animalCount, dogs, cats, others }
 */
export function parseRegionInfo(data = [], name = "") {
  const centerSet = new Set(data.map(item => item.careNm));
  const centerCount = centerSet.size;
  const animalCount = data.length;

  const dogs = data.filter(d => d.SPECIES_NM?.includes("개")).length;
  const cats = data.filter(d => d.SPECIES_NM?.includes("고양이")).length;
  const others = animalCount - dogs - cats;

  return { name, centerCount, animalCount, dogs, cats, others };
}
