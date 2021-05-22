function range(size, startAt = 0)  {
    return [...Array(size).keys()].map(i => i + startAt);
}

$(document).ready( function(){
    
    const now = moment()
    const startOfDay = moment().startOf('day').add(8,'hours');
    const endOfDay = moment().startOf('day').add(18,'hours');
    $('#currentDay').text(now.format('dddd, MMMM Do YYYY'))
    // const $pageHeader = () => { $('<></thead>') .text(moment().format('MM DD YY h a')) }
    // $('tr').
    const $genTable = $('<table></table>', {id:'#table-time-blocks', class:'table responsive'})


    // function() )
    const $parentRow = function()  { return $('<tr></tr>', { class:"row" }) }
    const $tdBlock = (utcId, classSet) => {return $("<td></td>", { id: utcId, class: `col time-block description ${classSet}` }) }
    const blockHeader = function(hourVal) { 
        let $thourEl = $("<th></th>", { text:hourVal, rowspan:1, class:"col-sm-2"})
        // $thourEl.classList.add("hour")

        return $thourEl
    }

    // <tr class="row"><th class="col-sm-2">10 am</th><td class=><textarea class=" description past"></textarea><i class="fa fa-save fa-lg float-right"></i></td></tr>
    const genTextarea =  (classSet, utc, currentText) =>  { return $("<textarea></textarea>", {name: utc, class: `form-control ${classSet}`, placeholder:currentText } )}
    // const $modal = $("<div></div>", {class: "modal"})
    
    // $('main').prepend($modal);
    const faBtn = function (classSet) {
        let tdEl = document.createElement("td")
        tdEl.className = "saveBtn"
        $("<span></span>" ,{ class:"fa fa-save fa-3x" } ).appendTo(tdEl)
        return tdEl;
        // return iconEl;
    }
    

     

    function renderFormEl(e)  {
        const target = e.target;
        let block = moment().hours(target.id)
        console.log(target)
        console.log(block)
        let formModal = $modal.clone()
        formModal.text(block.format('MM DD YY h a'))
        
        let formLabelEl = document.createElement('label');
        
        formLabelEl.setAttribute('for', `block-hour-${block.format('HH')}`)
        formModal.append(formLabelEl)
        let blockInputEl = document.createElement('input');
        formLabelEl.textContent = `${block.format('hh a')}`
        blockInputEl.classList.add('form-control');
        blockInputEl.type='text';
        blockInputEl.name=`block-hour-${block.format('HH')}`;
        blockInputEl.placeholder='ENTER YOUR TASK';
        
        $(".blockInputEl").remove(".inactive")
        // $(".blockInputEl").addClass("active")
    }
    let loadStorage = function() {
        if (localStorage.length) {
            const idKeys = $('.time-block.description').toArray()
            console.log(idKeys)
            idKeys.forEach(function(value) {
                let key = $(value).attr('id');
                console.log(key)
                let storedval = localStorage.getItem(key);
                console.log(storedval)
                $(value).text(storedval)
            })
        }
        // const userTasks = localStorage.getItem(moment().format('MMDDDYY'))
        // // .map( key => { return localStorage.get(key) } );
        // console.log(userTasks);
    }
    let doSave = function (el) {
        // localStorage.setItem(localStorage.length+1)
        console.log($(el).val())
        let utc = $(el).attr('name');
        let queryId = `#${utc}`
        // let key = moment(parseInt(el.children()[0].id)).utc()
        let formVal = $(el).val()
        $(queryId).text(formVal);
        $(queryId).show()
        // tableMatch.text(formVal);
        // tableMatch.show();
        // let value = el.children()[0].value;
        localStorage.setItem($(el).attr('name'), $(el).val());
        // el.children()[0].hide()
        $(el.remove());
        // $(el).hide();
        
        // $(el).replaceWith( $tdBlock($(el).attr('id'),select) );
    }
    let renderTimeBlocks = function() {
        // $( '#table-time-blocks' ).empty();
        
    
        const now = moment().format();

        const startDay  =  moment().startOf('day')
        const validHours = range(24);
        return validHours.map( value => {
            
            let block =   moment().startOf('day').add(value, 'hours')
            if ( block.isBetween(startOfDay, endOfDay) ) {
                let $tr = $parentRow();
                // console.log (Math.floor(moment(block).hours() ));
    // 
                // $tr.id = block.hours();
                // 

                
                
                let select =  block.isAfter(now) ? "future" :  ( moment(now).isSame(block,'hours') ?  "present" : "past" ) ;
                let $hourItem = blockHeader( block.format('h a'))
                // console.log($hourItem.html())
                let utc = block.utc().valueOf()
                let $tdItem = $tdBlock(utc,select);

                let $ti = genTextarea(select, utc);
                // $ti.placeholder = localStorage.getItem(utc);
                //.id = block.hours();             
                // $tdIn.wrap( $td )
                // $ti.id = block.hours();
                
                
                // let saveBtn = 
                // s$saveBtn.addClass(select);
                // $saveBtn.addClass(`hour-item`);
                // $ti.append(saveBtn);
                // $ ( '.hour-item').wrap($td)
                // $tdItem.append( $ti )
                
                // ("<td></td>", {id:`dat-hour-${value}`})
                // var $tdIn = $("<textarea></textarea>", {id:value, readonly:true, placeholder:"ENTER A TASK"})
                // let $saveIcon = $tdBtn.clone() ; 
                // ("<i></i>", {class:"fa fa-save"})
                
                // $td.addClass(select)
                // $tdIn.addClass(select)
                $tr.append($hourItem);
                
                $tr.append($tdItem)
                // $tr.append($tdIn)
                $tr.append( faBtn() );
                    // $tr.append($tdSave);
                    
                    // var $table = $("<table></table>", {id:'table-scheduler', class:'table'})
                    // $t.append($td)
                    // $td.text('TASK DISPLAY') 
                    
                        
                    // parentRow.append(blockHeaderEl)
                    // parentRow.append(blockDisplayEl)
                    // $tr.append($th)
                    // $tr.append($td)
                    // $table.append($td)
                    // $td.after($tr);
                    
                    // console.log($table)
                    // parentRow.appendChild(blockInputEl)
                    // timeTableEl.append(parentRow)
                    return $tr;
                // $('#table-time-blocks').append( $tr );

                } 
                })
        }
    
        // loadStorage();

    // let containerEl = $('.container');
    
    // $('table').prepend($tableHeader)
    // let $tableEl = $('<table></table>', {id: 'table-time-blocks', class:'table'})
    // containerEl.prepend($tableEl);
    // let $tableRows = renderTimeBlocks();
    // console.log($tableRows)
    let $tableEl = $genTable
    $tableEl.append(renderTimeBlocks());
    $tableEl.appendTo($('.container'))
    // let $tableRows = renderTimeBlocks();
    // console.log($tableRows);
    // $('#table-time-blocks').append($tableRows)
    loadStorage();
    $('.saveBtn').click( function() {
        console.log(this.previousSibling);
        doSave($(this.previousSibling) );
        $(this.previousSibling).show();
        // filter( $('textarea') ) );
    })
    // $('textarea')
    $('.description').click( function() {
        
        let el = $(this.children).filter( $('textarea') );
        $(this).hide();

        $(this).after( genTextarea( 'col time-block selected', $(this).attr('id'), $(this).text() ))

        // el.show();
        // $(this).replaceWith( '<input></input>' )
        // $(this).addClass('flex-grow')
        // inputEl.disabled = null; 
        // inputEl.removeClass('inactive')

        // const textEl = $(this.children )
        //     .filter( 'textarea' )
        // textEl.attrs() = false;
        // console.log(textEl.disabled)

        })

        
        
        // $(':previousSibling').doSave()
    // })
    
    
    // renderTimeBlocks();
    // $table.append( renderTimeBlocks() )
    // $('.container').append($table)
    // $('tr').wrapAll('<tbody></tbody>')
    
    
    // $('body').append($table) 
    // $('tr').mouseenter(function () {
    //     $ ( this ).addClass("selected")
    //     }
    
    // )
            
    // $('tr').mouseleave(function () {
    //     $( this ).removeClass(".selected")
    //     })
    // $('td').click( 
    //     (function() {
    //     $ ( this ).filter(
    //         $( 'textarea').readonly=null
    //     )}
    // ))
        
    
    
    // $('textarea').click(function() {
    //     $ ( this ).readonly = null 
        
    // })
        // $(this)
       
        // this.readonly=null;

// //   remove('.disabled')
//     })
//    var timeTableEl = $("<table></table>").html(renderTimeBlocks())
//     timeTableEl.html( renderTimeBlocks() )
})
    // $('main').append(renderTimeBlocks())
