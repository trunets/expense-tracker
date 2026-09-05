-- Total spending per category
select categories.name, sum(expenses.amount) as total_amount
from expenses
join categories on expenses.category_id = categories.id
group by categories.name;

-- Total spending in September
select sum(amount) as September_spendings
from expenses
where strftime('%Y-%m', date) = '2026-09';