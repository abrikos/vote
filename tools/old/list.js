const list = 'aurora.jpeg  autumn.jpeg  birds.jpeg  bone.jpeg  cow.jpeg  deer.jpeg  diamond.jpeg  gold.jpeg  mountain.jpeg  putin.jpeg  tea.jpeg';
for(const l of list.split('  ')){
    const f = l.split('.')
    console.log(`import ${f[0]} from "client/pages/home/research_files/${l}"`)
}
