#import subprocess
#cmd = ['multimetric', 'test.py'] #take this
#output = subprocess.Popen(cmd, stdout=subprocess.PIPE).communicate()[0]
#print(output)
# output = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()[0] #take this
# loc_out = output.decode().split("/n") #take this
#for line in loc_out: #take this
    #if line == "loc":
        #print(line)fl
# use os.popen and read(), and then get the LOC, halstead volume and cyclomatic complexity

#new working version of the code
import os
import json
import ast
from cognitive_complexity.api import get_cognitive_complexity

process = os.popen('multimetric test.py')
preprocessed = process.read()
process.close

process_two = os.popen('pylint test.py')
preprocessed_two = process_two.read()
process_two.close

process_three = os.popen('pydocstyle test.py')
preprocessed_three = process_three.read()
process_three.close

process_four = os.popen('pylama -l test.py')
preprocessed_four = process_four.read()
process_four.close

#process2 =os.popen('gcc -E test.py').read()
#process2.close

with open('test.py', 'r') as f:
    file_list = f.readlines()

file_contents = ''.join(file_list)
# print(file_contents)
tryout = ast.parse(file_contents).body[0]
cognitive_result = get_cognitive_complexity(tryout)
print('cognitive:{}'.format(cognitive_result))
json_data = json.loads(preprocessed)

find_loc = json_data.get('overall', {}).get('loc')
find_vocab = json_data.get('overall', {}).get('halstead_volume')
find_conflow = json_data.get('overall', {}).get('cyclomatic_complexity')
#find_dataflow = get_cognitive_complexity(tryout)


#print(type(json_data))

print("The LOC is: " + str(find_loc))
print("The Halstead Volume is: " + str(find_vocab))
print("The Cyclomatic Complexity is: " + str(find_conflow))
#print("The Data Flow Complexity is: " + find_dataflow)
print('============================== from here it is pylint======================================')
print(preprocessed_two)

preprocessed_two_split_list = preprocessed_two.splitlines()
target_line = preprocessed_two_split_list[1]
target_line_split_list = target_line.split(':')
#target_line_two = preprocessed_two_split_list[8]
target_line_two = 'Your code'
result_test = list(filter(lambda x: x.startswith(target_line_two), preprocessed_two_split_list))
result_test = list(filter(lambda x: target_line_two in x, preprocessed_two_split_list))
print('This is a test:', result_test)
print('This is the total score from pylint: {}', target_line_two)
print('linenum:{}, warning_id:{}, warning_message:{}'.format(target_line_split_list[1], target_line_split_list[3], target_line_split_list[4]))


print('===================================== from here this is pydocstyle=======================')
print(preprocessed_three)

preprocessed_three_split_list = preprocessed_three.splitlines()
target_line_three =  preprocessed_three_split_list[1]
target_line_split_list_three = target_line_three.split(':')
print("Warning Code:" + str(target_line_split_list_three[0]))
print("Warning Message:" + str(target_line_split_list_three[1]))
# print(preprocessed_two.splitlines())

print('=========================from here this is pylama===============================')
print(preprocessed_four)

preprocessed_four_split_list = preprocessed_four.splitlines()
target_line_four = preprocessed_four_split_list[1]
target_line_split_list_four = target_line_four.split(':')
print("Warning Code:" + str(target_line_split_list_four[1]))
print("Warning Message:" + str(target_line_split_list_four[2]))
