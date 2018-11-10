import $ from "jquery";

/**
 * An edit of tablesort 0.0.11 to work nicer with server rendering
 * tools such as Next.js.
 * Original project: https://github.com/kylefox/jquery-tablesort
 * @author Smnrkssn (smnrkssn@hotmail.se)
 */
class TableSorter {
    static defaultClassNames = {
        sort: "tablesort",
        sortable: "sortable",
        sortStart: "start",
        sortComplete: "complete",
        noSort: "no-sort",
        ascending: "sorted ascending",
        descending: "sorted descending"
    };

    static defaultComparator(a, b){
        let data1 = a.replace(/[%$,/:]*/g, "");
        let data2 = b.replace(/[%$,/:]*/g, "");

        if(!isNaN(data1) && !isNaN(data2)){
            data1 = parseFloat(data1);
            data2 = parseFloat(data2);
        } else {
            data1 = a.toLowerCase();
            data2 = b.toLowerCase();
        }

        if (data1 > data2) {
            return 1;
        } else if (data1 < data2) {
            return -1;
        } else {
            return 0;
        }
    }

    static defaultSettings = {
        classNames: TableSorter.defaultClassNames,
        comparator: TableSorter.defaultComparator,
        ascending: true
    };

    constructor($table, settings = TableSorter.defaultSettings){
        this.settings = $.extend({}, TableSorter.defaultSettings, settings);
        this.classNames = this.settings.classNames;

        this.$table = $table;
        this.$thead = this.$table.find("thead");
        this.$ths = (this.$thead.length > 0)
            ? this.$thead.find(`th:not(.${this.classNames.noSort})`)
            : this.$table.find(`th:not(.${this.classNames.noSort})`);
        this.comparator = this.settings.comparator;
        this.index = null;
        this.$th = null;
        this.ascending = this.settings.ascending;
        let self = this;

        $.each(this.$ths, (i, th) => {
            $(th).addClass(this.classNames.sortable);
        });

        this.$ths.on(`click.${this.classNames.sort}`, function(){
            self.sort($(this));
        });

        this.sort = this.sort.bind(this);
        this.sortAtName = this.sortAtName.bind(this);
        this.sortAtIndex = this.sortAtIndex.bind(this);
        this.sortCurrentlySelected = this.sortCurrentlySelected.bind(this);
        this.turnOffSorting = this.turnOffSorting.bind(this);
        this.hasSelectedHeader = this.hasSelectedHeader.bind(this);
    }

    hasSelectedHeader(){
        return this.$th !== null && this.$th !== undefined;
    }

    sortCurrentlySelected(ascending = true){
        if(ascending){
            this.index = null;
        } else {
            this.ascending = !ascending;
        }

        this.sort(this.$th);
    }

    sortAtName(thName){
        $.each(this.$ths, (i, th) => {
            let $th = $(th);
            if($th.text() === thName){
                this.sort($th);
            }
        });
    }

    sortAtIndex(thIndex){
        this.sort(this.$ths.get(thIndex));
    }

    sort($th){
        if($th === null) return;

        if(this.hasSelectedHeader()){
            if($th.text() !== this.$th.text()){
                this.$th.addClass(this.classNames.sortable);
            }
        }

        this.$th = $th;

        let self = this,
            table = this.$table,
            rowsContainer = table.find("tbody").length > 0 ? table.find("tbody") : table,
            rows = rowsContainer.find("tr").has("td, th"),
            cells = rows.find(":nth-child(" + ($th.index() + 1) + ")").filter("td, th"),
            sortBy = $th.data().sortBy,
            sortedMap = [];

        let unsortedValues = cells.map(function(idx, cell) {
            if (sortBy)
                return (typeof sortBy === "function") ? sortBy($th, $(cell), self) : sortBy;
            return ($(this).data().sortValue != null ? $(this).data().sortValue : $(this).text());
        });
        if (unsortedValues.length === 0) return;

        if (this.index !== $th.index()) {
            this.ascending = true;
            this.index = $th.index();
        } else {
            this.ascending = !this.ascending;
        }

        let direction = (this.ascending) ? 1 : -1;

        self.$table.trigger(`${self.classNames.sort}:${self.classNames.sortStart}`, [self]);
        self.$table.css("display");

        setTimeout(function() {
            self.$ths.removeClass(
                self.classNames.ascending + " " +
                self.classNames.descending
            );
            for (let i = 0, length = unsortedValues.length; i < length; i++) {
                sortedMap.push({
                    index: i,
                    cell: cells[i],
                    row: rows[i],
                    value: unsortedValues[i]
                });
            }

            sortedMap.sort(function(a, b) {
                return self.comparator(a.value, b.value) * direction;
            });

            $.each(sortedMap, function(i, entry) {
                rowsContainer.append(entry.row);
            });

            $th.removeClass(self.classNames.sortable);
            $th.addClass(self.ascending
                ? self.classNames.ascending
                : self.classNames.descending
            );

            self.$table.trigger(`${self.classNames.sort}:${self.classNames.sortComplete}`, [self]);
            self.$table.css("display");
        }, unsortedValues.length > 2000 ? 200 : 10);
    }

    turnOffSorting(){
        this.$ths.off("click.tablesort");
    }
}

export default TableSorter;