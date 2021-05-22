
$(document).ready( function(){
    function range(size, startAt = 0)  {
        return [...Array(size).keys()].map(i => i + startAt);
    }
    
    const startOfDay = moment().startOf('day').add(8,'hours');
    const endOfDay = moment().startOf('day').add(18,'hours') 

    // $('tr').

    const $parentRow = $('<tr></tr>', { "class": "time-block", "scope": "row"})

    // function() )
    const $td = $("<td></td>", { "class": "time-block inactive"})
    const $modal = $("<div></div>", {"class": "modal"})
    $('main').prepend($modal);
    let $table = $("<table></table>", {id:'table-scheduler', class:'table'})
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
        
        $(".modal").addClass("modal-active")
        $(".modal").addClass("active")
    }

    let renderTimeBlocks = function() {
  

        const startDau = moment().startOf('day')
        const validHours = range(24);
        return validHours.map( value => {
            var block =  moment().startOf('day').add(value, 'hours')

            if ( block.isBetween(startOfDay, endOfDay) ) {
                // console.log(block)                
                
                // let blockHeaderEl. = block.format('h a')
                // document.createElement('th')
                //blockHeaderEl.attr('scope', 'row')
                // blockHeaderEl.text = `${block.format('h a')}`
                const select =  ( block.isAfter(moment()) ? "future" : "past" );
                let $tr = $parentRow.clone()
                $tr.html(`<th>${block.format('h a')}</th>`)

                var $td = $("<td></td>", {id:value})
                $td.addClass(select)
                // var $table = $("<table></table>", {id:'table-scheduler', class:'table'})
                
                $td.text('TASK DISPLAY') 
                
                    
                // parentRow.append(blockHeaderEl)
                // parentRow.append(blockDisplayEl)
                // $tr.append($th)
                $tr.append($td)
                // $table.append($td)
                // $td.after($tr);
                
                // console.log($table)
                // parentRow.appendChild(blockInputEl)
                // timeTableEl.append(parentRow)
                return $tr

            }
        
       
        // validHours.map( (value,index) => {
        //         const divEl = document.createElement('div');
        //         divEl.setAttribute('id', `time-row-${index}`)
        //         divEl.textContent = value
        //         return divEl
        //     });
        // timeblocksEl.prepend(dateEl);
        // timeblocksEl.appendChild(timeBlockArray)
        });   
    }
    // console.log(renderTimeBlocks(range(24)));
    $table.append(renderTimeBlocks())
    $('#timeblocks').prepend($table) 

        
    $('td').mouseenter(function () {
        $(this).addClass("selected")
        }
    
    )
            
    $(".selected").mouseleave(function () {
        $(this).remove(".selected")
        }
    
    )
    $('td').click(function(e) {
        renderFormEl(e);
    })
//    var timeTableEl = $("<table></table>").html(renderTimeBlocks())
//     timeTableEl.html( renderTimeBlocks() )
})
    // $('main').append(renderTimeBlocks())
