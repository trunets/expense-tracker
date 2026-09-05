-- Total spending per category
select categories.name, sum(expenses.amount) as total_expense
from expenses
join categories on expenses.category_id = categories.id
group by categories.name;

-- Total spending in September
select sum(amount) as September_spendings
from expenses
where strftime('%Y-%m', date) = '2026-09';

-- Most Expensive single purchase
select description,amount 
from expenses
order by amount desc limit 1;

--Average expense per category
select categories.name, avg(expenses.amount) as avg_expense
from expenses
join categories on expenses.category_id = categories.id
group by categories.name;

-- Count how many expenses per category
select categories.name, count(*) as expense_per_category
from expenses
join categories on expenses.category_id = categories.id
group by categories.name;