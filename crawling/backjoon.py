# 백준 문제 크롤링
# 문제번호 | 제목 | 맞은 사람 | 제출 | 정답 비율 |

from selenium import webdriver
import time
import csv

driver = None

def driver_setting():
    global driver
    driver = webdriver.Chrome("./chromedriver.exe")
    driver.implicitly_wait(3)

def get_problem_set_page(page_num):
    global driver
    url = f'https://www.acmicpc.net/problemset/{page_num}'
    driver.get(url)
    time.sleep(1)

def get_problem_info():
    global driver
    global csvwriter
    problem_set = driver.find_element_by_id('problemset')
    tbody = problem_set.find_element_by_tag_name("tbody")
    tr_collection = tbody.find_elements_by_tag_name("tr")

    for tr in tr_collection:
        td_collection = tr.find_elements_by_tag_name("td")
        problem_id = td_collection[0].text
        problem_name = td_collection[1].find_elements_by_tag_name("a")[0].text
        problem_success_cnt = td_collection[3].find_elements_by_tag_name("a")[0].text
        problem_trial_cnt = td_collection[4].find_elements_by_tag_name("a")[0].text
        problem_success_rate = td_collection[5].text
        csvwriter.writerow([f'{problem_id}:::{problem_name}:::{problem_success_cnt}:::{problem_trial_cnt}:::{problem_success_rate}'])
    time.sleep(1)

def open_csv():
    global csvwriter
    global csvfile
    csvfile = open('backjoon.csv', 'a', -1, "utf-8-sig", newline="")
    csvwriter = csv.writer(csvfile)

def close_csv_writer():
    global csvfile
    csvfile.close()

def main():
    open_csv()
    driver_setting()
    for i in range(1, 174):
        get_problem_set_page(i)
        get_problem_info()
    close_csv_writer()

if __name__ == '__main__':
    main()