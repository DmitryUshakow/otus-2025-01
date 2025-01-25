// Unit #1
function kolobok (name){
    let a
    switch(name){
        case "Дедушка":
            a = "Я от дедушки ушел"
            break
        case "Заяц":
            a = "Я от зайчика ушел"
            break
        case "Лиса":
            a = "Меня съели"
            break
        }
        return a
    }

console.log(kolobok("Заяц"))
console.log(kolobok("Лиса"))
console.log(kolobok("Дедушка"))

// Unit #2
function newYear(person){
    let a
    a = person + '!' + ' ' + person + '!' + ' ' + person + '!' + ' '
    return a
}
console.log(newYear("Дед Мороз"))
console.log(newYear("Снегурочка"))

// запускается по комманде через терминал node src/tale.js из папки